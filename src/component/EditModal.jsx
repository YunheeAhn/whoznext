import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const EditModal = ({ contact, onSave, onClose }) => {
  const [editedContact, setEditedContact] = useState(contact);

  useEffect(() => {
    setEditedContact(contact);
  }, [contact]);

  if (!contact) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedContact({ ...editedContact, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedContact);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>연락처 수정</h2>
        <div className="modal-form">
          <label>이미지</label>

          {editedContact.image && (
            <img src={editedContact.image} alt="미리보기" className="preview-image" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <label>이름</label>
          <input
            type="text"
            name="name"
            value={editedContact.name}
            onChange={handleChange}
            className="normal-input"
          />

          <label>전화번호</label>
          <input
            type="text"
            name="phoneNumber"
            value={editedContact.phoneNumber}
            onChange={handleChange}
            className="normal-input"
          />

          <label>메모</label>
          <textarea name="memo" value={editedContact.memo} onChange={handleChange} />

          <div className="modal-buttons">
            <Button variant="contained" color="success" onClick={handleSave}>
              수정 완료
            </Button>
            <Button variant="contained" color="primary" onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
