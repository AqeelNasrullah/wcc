import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { app } from "utils/config";

const PageHead = ({ title, keywords, description }) => {
  const pageTitle = title
    ? title + " | " + app.firstName + " " + app.lastName
    : app.firstName + " " + app.lastName;

  const router = useRouter();

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="canonical" href={router.pathname} />
      {keywords && <meta name="keywords" content={keywords} />}
      {description && <meta name="description" content={description} />}
    </Head>
  );
};

export default PageHead;
