import React, { useState } from "react";
import { Lable, SearchInput } from "./Search.style";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "../Button/Button.style";
import { Link } from "react-router-dom";

interface Iprops {
  width?: string;
}

export default function Search(props: Iprops) {
  let [value, setValue] = useState<string>("");
  const ref: any = React.createRef();

  const handleValue = (e: React.FormEvent<HTMLInputElement>): void => {
    let val: string = e.currentTarget.value;
    setValue(val);
  };

  let handleKey = (e: any) => {
    let keyCode: any = e.keyCode;
    if (keyCode === 13) {
      ref.current.click();
    }
  };

  return (
    <Lable width={props.width}>
      <SearchInput value={value} onChange={handleValue} onKeyUp={handleKey} />
      <Link
        to={`/serch/${value}`}
        ref={ref}
        style={{ width: "22%", textDecoration: "none" }}
      >
        <Button
          sx={{
            width: "100%",
            height: "40px",
            fontSize: "16px",
            minWidth: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          <SearchIcon /> Search
        </Button>
      </Link>
    </Lable>
  );
}
