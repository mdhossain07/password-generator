import { useEffect, useCallback, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isCharacter, setIsCharacter] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isCharacter) {
      str += "!#@$%&~";
    }

    if (isNumber) {
      str += "0123456789";
    }

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [isCharacter, isNumber, length]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isCharacter, isNumber, passwordGenerator]);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-teal-800 py-3">
      <h2 className="text-center text-2xl font-medium text-white">
        Password Generator
      </h2>
      <div className="flex justify-around items-center">
        <input
          type="text"
          value={password}
          className="bg-neutral-400 text-black py-1.5 w-9/12 mt-3 outline-none"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPassword}
          className=" bg-slate-500 px-5 font-medium text-lg py-1.5 mt-2.5 rounded-md "
        >
          Copy
        </button>
      </div>

      <div className="flex gap-x-5 mt-5 px-3">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={8}
            max={16}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-orange-400 font-medium">
            Length : {length}
          </label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            onChange={() => setIsCharacter(!isCharacter)}
          />
          <label className="text-orange-400 font-medium">Characters</label>
        </div>

        <div className="flex items-center gap-x-2">
          <input type="checkbox" onChange={() => setIsNumber(!isNumber)} />
          <label className="text-orange-400 font-medium">Numbers</label>
        </div>
      </div>
    </div>
  );
}

export default App;
