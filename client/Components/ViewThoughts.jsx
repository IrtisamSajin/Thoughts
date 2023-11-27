import { useState } from "react";
import ArrowLeft from "../Icons/ArrowLeft";
import ArrowRight from "../Icons/ArrowRight";
import DeleteIcon from "../Icons/Delete";
import Pinned from "../Icons/Pinned";
import UnPinned from "../Icons/UnPinned";

export default function ViewThoughts({ onUpdate, thoughts }) {
  const [loading, setLoading] = useState(false);
  async function deleteThought(index) {
    setLoading(true);
    const updatedThoughts = thoughts.filter((_, idx) => idx != index);
    await onUpdate(updatedThoughts);
    setLoading(false);
  }

  async function togglePin(index) {
    setLoading(true);
    let updatedThoughts = thoughts.map((obj) => {
      return { ...obj };
    });

    if (updatedThoughts[index].pinned) {
      updatedThoughts[index].pinned = false;
      await onUpdate(updatedThoughts);
    } else {
      updatedThoughts[0].pinned = false;
      let changedThought=updatedThoughts[index];
      for (let i = index; i > 0; i--)
        updatedThoughts[i] = updatedThoughts[i - 1];
      updatedThoughts[0] = changedThought;
      updatedThoughts[0].pinned = true;
      await onUpdate(updatedThoughts);
    }

    setLoading(false);
  }

  async function moveRight(index) {
    setLoading(true);
    let updatedThoughts = thoughts.map((obj) => {
      return { ...obj };
    });
    if (index != updatedThoughts.length - 1) {
      let temp = updatedThoughts[index];
      updatedThoughts[index] = updatedThoughts[index + 1];
      updatedThoughts[index + 1] = temp;
      await onUpdate(updatedThoughts);
    }
    setLoading(false);
  }

  async function moveLeft(index) {
    setLoading(true);
    let updatedThoughts = thoughts.map((obj) => {
      return { ...obj };
    });
    if (index != 0 && !updatedThoughts[index - 1].pinned) {
      let temp = updatedThoughts[index];
      updatedThoughts[index] = updatedThoughts[index - 1];
      updatedThoughts[index - 1] = temp;
      await onUpdate(updatedThoughts);
    }
    setLoading(false);
  }

  return (
    <div className="row justify-content-center justify-content-xl-start">
      {thoughts.map((thought, index) => (
        <div key={index} className="col-10 col-md-8 col-lg-6 col-xl-4">
          <div className="card m-3 p-3 border-dark">
            <h3 className="card-title">{thought.title}</h3>
            <p className="card-text">{thought.body} </p>
            <div>
              <button
                type="button"
                onClick={() => deleteThought(index)}
                className="btn btn-light border-dark m-1"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Delete"
                disabled={loading ? true : false}
              >
                <DeleteIcon />
              </button>
              <button
                type="button"
                className="btn btn-light border-dark m-1"
                onClick={() => togglePin(index)}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Toggle pin"
                disabled={loading ? true : false}
              >
                {thought.pinned && <Pinned />}
                {!thought.pinned && <UnPinned />}
              </button>
              {!thought.pinned && (
                <span>
                  <button
                    type="button"
                    className="btn btn-light border-dark m-1"
                    onClick={() => moveLeft(index)}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    data-bs-title="Move Up"
                    disabled={loading ? true : false}
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    type="button"
                    className="btn btn-light border-dark m-1"
                    onClick={() => moveRight(index)}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    data-bs-title="Move Down"
                    disabled={loading ? true : false}
                  >
                    <ArrowRight />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
