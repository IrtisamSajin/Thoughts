import { useState } from "react";

const wordSizeLimit = 100;

export default function NewThought({ onUpdate, thoughts }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [bodyCount, setBodyCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const bodyCountSize = {
    fontSize: "0.7rem",
  };

  function updateTitle(event) {
    setTitle(event.target.value);
  }
  function updateBody(event) {
    let updatedBody = event.target.value;
    if (updatedBody.length > wordSizeLimit) {
      updatedBody = updatedBody.slice(0, wordSizeLimit);
    }
    setBodyCount(updatedBody.length);
    setBody(updatedBody);
  }

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

    if (title === "") return;
    //----------Have to remove whitespace at the end of title and body
    var pinned = false;
    try{
      var success = await onUpdate([...thoughts, { title, body, pinned }]);
    }catch(err){
      
    }
    if (success) {
      setTitle("");
      setBody("");
      setBodyCount(0);
    }
    setLoading(false);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-10 col-md-8 col-lg-6 col-xl-5">
        <div className="card m-sm-4 m-2 mt-4 p-sm-3 p-1 border-dark">
          <form onSubmit={handleSubmit} className="">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-11 col-md-10 mt-3">
                  <label htmlFor="title" className="form-label fs-6">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control border-secondary"
                    id="title"
                    onChange={updateTitle}
                    required
                    value={title}
                  ></input>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-11 col-md-10 mt-3">
                  <label htmlFor="body" className="form-label fs-6">
                    Body
                  </label>
                  <textarea
                    className="form-control border-secondary"
                    id="body"
                    onChange={updateBody}
                    rows="5"
                    value={body}
                    required
                  >
                    {body}
                  </textarea>
                </div>
              </div>
              <div className="row justify-content-end me-md-4 me-1">
                <div className="col-auto fw-light" style={bodyCountSize}>
                  {bodyCount}/{wordSizeLimit}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-11 col-md-10 m-3">
                  {!loading && (
                    <button type="post" className="btn btn-dark w-100">
                      Post
                    </button>
                  )}
                  {loading && (
                    <button type="post" className="btn btn-dark w-100 disabled">
                      <span
                        className="spinner-border spinner-border-sm"
                        aria-hidden="true"
                      ></span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
