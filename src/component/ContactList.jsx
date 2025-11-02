import React, { useState } from "react";
import usePhoneBookStore from "../store/usePhoneBookStore";
import EditModal from "./EditModal"; // 새로 만든 모달 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPhone } from "@fortawesome/free-solid-svg-icons";

const ContactList = () => {
  const { phoneBook, deleteContact, updateContact } = usePhoneBookStore();

  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const handleSearch = () => {
    setSearchTerm(inputValue.trim());
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredContacts = searchTerm
    ? phoneBook.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerPhone = String(item.phoneNumber).toLowerCase();
        const keyword = searchTerm.trim().toLowerCase();

        return lowerName.includes(keyword) || lowerPhone.includes(keyword);
      })
    : phoneBook;

  return (
    <div>
      <div className="search-section">
        <input
          type="text"
          placeholder="이름 또는 전화번호 검색"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <div className="list-section">
        {!searchTerm && phoneBook.length === 0 && (
          <p className="no-result">연락처를 추가해주세요.</p>
        )}

        {searchTerm && filteredContacts.length === 0 && (
          <p className="no-result">검색 결과가 없습니다.</p>
        )}

        {filteredContacts.length > 0 &&
          filteredContacts.map((item) => (
            <dl key={item.id} className="contact-item">
              <dt>{item.image ? <img src={item.image} alt={item.name} /> : "이미지 없음"}</dt>
              <dd>
                <div className="information">
                  <h2 className="contact-name">{item.name}</h2>
                  <p className="contact-phone">
                    <span>
                      <FontAwesomeIcon icon={faPhone} />
                    </span>{" "}
                    {item.phoneNumber}
                  </p>
                  <p className="contact-memo">
                    <span>
                      <FontAwesomeIcon icon={faPencil} />
                    </span>{" "}
                    {item.memo}
                  </p>
                </div>
                <div className="actions">
                  <button onClick={() => setSelectedContact(item)} className="edit">
                    수정
                  </button>
                  <button onClick={() => deleteContact(item.id)} className="delete">
                    삭제
                  </button>
                </div>
              </dd>
            </dl>
          ))}
      </div>

      {selectedContact && (
        <EditModal
          contact={selectedContact}
          onSave={updateContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
};

export default ContactList;
