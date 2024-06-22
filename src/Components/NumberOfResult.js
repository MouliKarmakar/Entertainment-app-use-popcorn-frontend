import React from "react";
import User from "./LogoHuman";
import { Flex } from "antd";
export default function Numresults({ movies }) {
  return (
    <Flex vertical={false} gap={8} justify="flex-end" align="center">
      <p className="num-results">
        Found <strong>{movies ? movies.length : 0}</strong> results
      </p>
      <User />
    </Flex>
  );
}
