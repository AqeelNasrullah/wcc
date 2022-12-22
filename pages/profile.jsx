import Header from "components/Header";
import PageHead from "components/PageHead";
import { getSession } from "next-auth/react";
import React from "react";

const Profile = ({ session }) => {
  return (
    <>
      <PageHead
        title={(session?.user?.name || session?.username) + " Profile"}
      />

      <div>
        <Header />
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

  return {
    props: { session },
  };
};

export default Profile;
