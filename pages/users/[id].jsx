import EndpointError from "components/EndpointError";
import Header from "components/Header";
import PageHead from "components/PageHead";
import UnauthorizedError from "components/UnauthorizedError";
import { getSession } from "next-auth/react";
import React from "react";
import { backendCall, end_points } from "utils/end-points";

const EditUser = ({ status, user, session, message }) => {
  if (!session.isAdmin) {
    return <UnauthorizedError title={"Edit " + user.name} />;
  }

  if (!status) {
    return <EndpointError message={message} />;
  }

  return (
    <>
      <PageHead title={"Edit " + user.name} />

      <div>
        <Header />

        <h1>{user.name}</h1>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  console.log(context.query.id);

  try {
    const result = await backendCall
      .get(end_points.users_single + context.query.id, {
        headers: {
          Cookie: context.req.headers.cookie,
        },
      })
      .then((resp) => resp?.data);
    return {
      props: {
        status: true,
        user: result,
        session,
      },
    };
  } catch (error) {
    return {
      props: {
        status: false,
        message: error.response?.data?.message || error.message,
        session,
      },
    };
  }
};

export default EditUser;
