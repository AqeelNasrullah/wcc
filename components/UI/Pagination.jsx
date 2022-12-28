import { useRouter } from "next/router";

const Pagination = ({ recordCount, recordsPerPage, paginate }) => {
  const router = useRouter();

  const firstPage = 1;
  const lastPage = Math.ceil(recordCount / recordsPerPage);

  const placeholder = "---";

  const firstRange = [firstPage, firstPage + 1, firstPage + 2];
  const lastRange = [lastPage - 2, lastPage - 1, lastPage];

  let range = [];

  const currentPage = +router.query.page || 1;

  if (lastPage < 7) {
    for (let index = 0; index < lastPage; index++) {
      range.push(index + 1);
    }
  } else if (
    firstRange.slice(0, firstRange.length - 1).includes(currentPage) ||
    lastRange.slice(1).includes(currentPage)
  ) {
    range = [...firstRange, placeholder, ...lastRange];
  } else {
    range = [
      firstPage,
      placeholder,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      placeholder,
      lastPage,
    ];
  }

  return (
    <div>
      <ul className="pagination m-0">
        <li
          className={`page-item ${currentPage === firstPage && "disabled"}`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (currentPage !== firstPage) paginate(currentPage - 1);
          }}
        >
          <a className="page-link">&laquo;</a>
        </li>
        {range.map((item, index) => (
          <li
            className={`page-item ${currentPage === item && "active"}`}
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (item !== placeholder || item !== currentPage) {
                paginate(item);
              }
            }}
          >
            <a className="page-link">{item}</a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === lastPage && "disabled"}`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (currentPage !== lastPage) paginate(currentPage + 1);
          }}
        >
          <a className="page-link">&raquo;</a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
