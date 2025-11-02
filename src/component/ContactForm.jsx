import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import usePhoneBookStore from "../store/usePhoneBookStore";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [memo, setMemo] = useState("");
  const [uploadImgUrl, setUploadImgUrl] = useState("/default-img.png");

  const { addContact } = usePhoneBookStore();

  const defaultImage = "/default-img.png"; // 기본 이미지

  const handleAddContact = () => {
    if (name.trim() === "" || phoneNumber.trim() === "" || memo.trim() === "") {
      alert("이름, 전화번호, 메모를 모두 입력해주세요.");
      return;
    }

    // 업로드한 이미지가 없으면 defaultImage 사용
    const contactImage = uploadImgUrl || defaultImage;

    addContact({ name, phoneNumber, memo, image: contactImage });

    // 초기화
    setName("");
    setPhoneNumber("");
    setMemo("");
    setUploadImgUrl(defaultImage);
  };

  // 이미지 업로드 처리
  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
    reader.readAsDataURL(uploadFile);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <div className="img-wrap">
        <div className="img-box">
          <img src={uploadImgUrl} alt="프로필 사진" />
        </div>
        <input accept="image/*" type="file" onChange={onchangeImageUpload} />
      </div>

      <TextField
        id="name"
        label="이름"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="phone-number"
        label="전화번호"
        type="tel"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        id="memo"
        label="메모할 내용"
        variant="outlined"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleAddContact}>
        추가
      </Button>
    </Box>
  );
};

export default ContactForm;
