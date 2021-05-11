import React, { useState, useEffect } from "react";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import firebase from "../../../config/Firebase";
import NavbarHeader from "../../../components/molecules/NavbarHeader";
import NavbarFooter from "../../../components/molecules/NavbarFooter";

const Homepage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]); //for set to array
  const [button, setButton] = useState("Save");
  const [selectedNotes, setSelectedNotes] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("notes")
      .on("value", (res) => {
        if (res.val()) {
          //ubah menjadi array
          const rawData = res.val();
          const notesArr = [];
          Object.keys(rawData).map((item) => {
            notesArr.push({
              id: item,
              ...rawData[item],
            });
          });
          setNotes(notesArr);
        }
      });
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setButton("Save");
    setSelectedNotes({});
  };

  const handleSubmit = () => {
    const dataSubmit = {
      title: title,
      description: description,
    };
    if (button === "Save") {
      //insert
      firebase.database().ref("notes").push(dataSubmit);
    } else {
      //update
      firebase.database().ref(`notes/${selectedNotes.id}`).set(dataSubmit);
    }
    resetForm();
  };

  const onUpdateData = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setButton("Update");
    setSelectedNotes(item);
  };

  const onDeleteData = (item) => {
    //delete
    firebase.database().ref(`notes/${item.id}`).remove();
  };

  return (
    <div>
      <NavbarHeader />
      <div className="container-fluid silver">
        <div class="row">
          <div class="col col-4">
            <div className="container mt-5">
              <h3>Add Notes</h3>
              <Input
                className="form-control "
                label="Title"
                placeholder="Input the title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <Input
                className="form-control"
                label="Notes"
                placeholder="Add the notes"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <br />
              <Button
                onClick={handleSubmit}
                text={button}
                className="btn btn-success form-control"
              />
              {button === "Update" && (
                <Button
                  onClick={resetForm}
                  text="Cancel Update"
                  className="btn btn-secondary form-control"
                />
              )}
            </div>
          </div>
          <div class="col col-8">
            <div>
              <div className="container mt-5">
                <h3>Notes</h3>
              </div>
              <table class="table table-striped table-hover container mt-4">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Update/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => onUpdateData(item)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => onDeleteData(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="paddingBottomHomepage silver" />
      <NavbarFooter />
    </div>
  );
};

export default Homepage;
