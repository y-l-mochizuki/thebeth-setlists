"use client";

import { Music } from "@/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

type Props = {
  musics: Music[];
};

export const MusicTable = ({ musics }: Props) => {
  return (
    <Table hideHeader>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
      </TableHeader>
      <TableBody>
        {musics.map((v) => (
          <TableRow key={v.id}>
            <TableCell>{v.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
