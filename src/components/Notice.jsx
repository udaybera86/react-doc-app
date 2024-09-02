import React from "react";
import { useEffect, useState } from "react";

function Notice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowNotice(true);

      const hideTimer = setTimeout(() => {
        setShowNotice(false);
      }, 10000);

      return () => clearTimeout(hideTimer);
    }, 1200);

    return () => clearTimeout(showTimer);
  }, []);

  return (
    <div className="notice-wrapper absolute bottom-[10%] left-0 z-[3] w-full flex justify-center">
      {showNotice && (
        <div
          style={noticeStyle}
          className="bg-zinc-900/90 text-[#F5F5F5] rounded-xl p-4 text-center"
        >
          <p>
            🖐️ Ready to re-arrange? 😍 Just drag this cards anywhere on
            the screen for a personalized experience!
          </p>
        </div>
      )}
    </div>
  );
}

const noticeStyle = {
  animation: "fadeIn 0.5s",
};

export default Notice;
