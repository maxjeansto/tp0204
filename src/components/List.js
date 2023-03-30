import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const data = [
  {
    id: 1,
    name: "Maxime Saada",
    email: "maxime@example.com",
  },
  {
    id: 2,
    name: "Elie Sultan",
    email: "elie@example.com",
  },
  {
    id: 3,
    name: "Meir Sabbah",
    email: "meir@example.com",
  },
  {
    id: 4,
    name: "Jimmy Adda",
    email: "jimmy@example.com",
  },
];

const ListStudents = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        List Students
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="secondary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListStudents;
