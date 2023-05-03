import React from "react";
import { Formik, Form, Field } from "formik";
import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
export default function LoginDB({ onAccess, onLogin }) {
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{
          host: "",
          username: "",
          password: "",
          database: "",
        }}
        onSubmit={(values) => {
          // Gửi thông tin đăng nhập đến API
          fetch("http://localhost:8000/mysql-login", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
          }).then((response) => {
            if (response.status === 200) {
              onLogin(values);
              alert("Thành công");

              onAccess(true);
            } else {
              // Hiển thị thông báo lỗi nếu đăng nhập không thành công
              alert("Invalid username or password");
              onAccess(false);
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mb-20 w-[500px]">
            <FormGroup controlId="formHost">
              <FormLabel>host</FormLabel>
              <Field
                as={FormControl}
                type="text"
                name="host"
                placeholder="Enter host"
              />
            </FormGroup>
            <FormGroup controlId="formUsername">
              <FormLabel>Username</FormLabel>
              <Field
                as={FormControl}
                type="text"
                name="username"
                placeholder="Enter username"
              />
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormLabel>Password</FormLabel>
              <Field
                as={FormControl}
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </FormGroup>
            <FormGroup controlId="formDatabase">
              <FormLabel>Database</FormLabel>
              <Field
                as={FormControl}
                type="text"
                name="database"
                placeholder="Enter database name"
              />
            </FormGroup>
            <Button variant="primary" type="submit" className="mt-5">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
