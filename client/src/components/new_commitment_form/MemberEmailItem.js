import React from "react";
import classes from "./Styles.module.scss";
import Button from "../button/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function MemberEmailItem(props) {
  
  return (
    <Form.Group controlId={"newCommitForm.ControlInput" + (3 + props.index)}>
      <Form.Row>
        <Col xs={1} sm={1} xl={1} md={1} lg={1} >
          <Button
              formRemove={true}
              smallCircle={true}
              onClick={e => props.removeMemberEmail()}
              innerContent="-"
            />
        </Col>
        <Col >
          <Form.Control name={"email" + props.index} placeholder="Enter email" type="email" value={props.memberEmail} onChange={props.setMemberEmail} />
        </Col>
      </Form.Row>
    </Form.Group>
  );
};