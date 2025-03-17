import Pagination from "react-bootstrap/Pagination";

function AdvancedExample({ pageNumber, setPageNumber, pageArray }) {
  return (
    <div className="page-selector mt-5  w-100">

    <Pagination className="page">
      <Pagination.Prev
       className="dots1"
        onClick={() => {
          setPageNumber(pageNumber - 1);
        }}
      />

      <div className="pages d-flex mx-2">
        <Pagination.Item  
          key={0}
          onClick={() => {
            setPageNumber(Number);
          }}
          className={pageNumber <= 3 ? `d-none` : ``}
        >
          {1}
        </Pagination.Item>

        <Pagination.Ellipsis className={pageNumber <= 3 ? `d-none dots` : ` dots`} />

        {pageArray.map((page) => (
          
          <Pagination.Item
            key={page}
            onClick={() => {
              setPageNumber(page);
            }}
            className={` ${(pageNumber < page - 2 || pageNumber > page + 2) ? "d-none" : "" }  ${pageNumber == page ? "active" : "" } `}
           
          >
            {page}
          </Pagination.Item>
        ))}

        <Pagination.Ellipsis className={pageNumber >= pageArray.length-2 ? `d-none dots` : ` dots`}/>
        <Pagination.Item
          key={pageArray.length+1}
          onClick={() => {
            setPageNumber(pageArray.length);
          }}
          className={pageNumber >= pageArray.length-2 ? `d-none` : ``}
        >
          {pageArray.length}
        </Pagination.Item>
      </div>

      <Pagination.Next
      className="dots1"
        onClick={() => {
          setPageNumber(pageNumber + 1);
        }}
      />
    </Pagination>
  </div>
  );
}

export default AdvancedExample;
