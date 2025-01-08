import SearchBox from "../header/SearchBox";

export default function Search() {
  return (
    <div className="search_home container-fluid">
      <div className="content">
        <h1 className="">
          <p>The best platform </p>for freelancers and business owners
        </h1>
        <SearchBox placeholder="Search for any service..." />
      </div>
    </div>
  );
}
