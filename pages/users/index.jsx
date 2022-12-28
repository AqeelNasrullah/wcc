import EndpointError from "components/EndpointError";
import Header from "components/Header";
import PageHead from "components/PageHead";
import Pagination from "components/UI/Pagination";
import Table from "components/UI/Table";
import UnauthorizedError from "components/UnauthorizedError";
import moment from "moment/moment";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { pagination } from "utils/config";
import { backendCall, end_points } from "utils/end-points";
import { getImage } from "utils/helpers";

const Users = ({ status, message, users, session }) => {
  const router = useRouter();
  const page = router.query.page || 1;

  if (!session.isAdmin) {
    return <UnauthorizedError title="Users" />;
  }

  if (!status) {
    return <EndpointError message={message} />;
  }

  return (
    <>
      <PageHead title="Users" />

      <div>
        <Header />

        <div className="p-3 pt-4">
          <h3 className="mb-4">Users</h3>
          <ul className="pills-container mb-4">
            <li className="pill">
              <Link href="/users/add">
                <i className="fa-solid fa-add"></i> Add New User
              </Link>
            </li>
          </ul>

          <Table
            headerData={[
              "Image",
              "Name",
              "Username",
              "Email",
              "Verified",
              "Admin",
              "Joined At",
            ]}
            tableData={users.data}
            // img="image"
            exclude={["_id", "__v", "updatedAt"]}
            edit={(id) => router.replace(`/users/${id}`)}
            del={(id) => alert(id)}
          />

          {users.data.length > 0 && (
            <div className="d-flex align-items-center justify-content-between">
              <Pagination
                recordCount={users.count}
                recordsPerPage={pagination.length}
                paginate={(pg) => router.push("/users?page=" + pg)}
              />
              <p className="mb-0">
                Showing records {(page - 1) * pagination.length + 1} -{" "}
                {users.data.length < users.count
                  ? page * pagination.length
                  : users.count}{" "}
                of {users.count}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const page = context?.query.page || 1;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const result = await backendCall
      .get(end_points.users + "?page=" + page, {
        headers: {
          Cookie: context.req.headers.cookie,
        },
      })
      .then((resp) => resp.data);

    const users = result?.data?.map((item) => {
      item.image = getImage(item.image);
      item.verified = item.verified ? "Yes" : "No";
      item.isAdmin = item.isAdmin ? "Yes" : "No";
      item.createdAt = moment(item.createdAt).format("DD MMM YYYY hh:mm A");
      return item;
    });

    return {
      props: {
        status: true,
        users: { count: result?.count, data: users },
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

export default Users;
