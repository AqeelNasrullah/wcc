import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const PageHead = ({ title, keywords, description }) => {
  const pageTitle = title
    ? title +
      " | " +
      process.env.NEXT_PUBLIC_APP_FIRST_NAME +
      " " +
      process.env.NEXT_PUBLIC_APP_LAST_NAME
    : process.env.NEXT_PUBLIC_APP_FIRST_NAME +
      " " +
      process.env.NEXT_PUBLIC_APP_LAST_NAME;

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
