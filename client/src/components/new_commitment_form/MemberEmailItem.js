import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function MemberEmailItem(props) {
  
  return (
    <Form.Group controlId={"newCommitForm.ControlInput" + (3 + props.index)}>
      <Form.Row>
        <Col >
          <Button
              formRemove={true}
              smallCircle={true}
              onClick={e => props.removeMemberEmail()}
              innerContent="-"
            />
        </Col>
        <Col xs={50} sm={50} xl={50} md={50} lg={50}>
          <Form.Control name={"email" + props.index} placeholder="Enter email" type="email" value={props.memberEmail} onChange={props.setMemberEmail} />
        </Col>
      </Form.Row>
    </Form.Group>
  );
};