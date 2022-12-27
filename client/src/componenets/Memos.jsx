import React, { useEffect, useState } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const getMemos = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && getMemos();
  }, [contract]);

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "1.8rem",
          color: "#EFF5F5",
        }}
      >
        MESSAGES
      </h2>
      {memos.map((memo) => {
        return (
          <div key={memo.timestamp}>
            <div className="row">
              <p className="td">
                {new Date(memo.timestamp * 1000).toLocaleString()}
              </p>
              <p className="td">{memo.name}</p>
              <p className="td">{memo.message}</p>
              <p className="td">{memo.from}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Memos;
