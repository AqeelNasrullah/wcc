import Header from "components/Header";
import PageHead from "components/PageHead";
import UnauthorizedError from "components/UnauthorizedError";
import UserForm from "components/USerForm";
import { useToast } from "contexts/toast-context";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { assets } from "utils/config";
import { backendCall, end_points } from "utils/end-points";

const AddUser = ({ session }) => {
  const { toast } = useToast();
  const router = useRouter();

  if (!session.isAdmin) {
    return <UnauthorizedError title="Add User" />;
  }

  const data = {
    image: assets.avatar,
    name: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
    verified: true,
    isAdmin: false,
  };

  const submitHandler = async (values) => {
    try {
      const result = await backendCall
        .post(end_points.users_add, values)
        .then((resp) => resp.data);
      toast(result.message, "success");
      router.push("/users");
    } catch (error) {
      toast(error.response?.data?.message || error.message, "error");
    }
  };

  return (
    <>
      <PageHead title="Add User" />

      <div>
        <Header />
        <div className="p-3">
          <div
            style={{
              maxWidth: "700px",
              width: "100%",
              margin: "0px auto",
              padding: "50px 10px",
            }}
          >
            <h3 className="mb-5">Add New User</h3>
            <UserForm data={data} submitHandler={submitHandler} />
          </div>
        </div>
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

export default AddUser;
