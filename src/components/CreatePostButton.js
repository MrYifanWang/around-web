import React, { Component } from "react";
import { Modal, Button, message } from "antd";

import { CreatePostForm } from "./CreatePostForm";
import { API_ROOT, AUTH_HEADER, POST_KEY, TOKEN_KEY } from "../constants";

export class CreatePostButton extends Component {
  state = {
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
      }

      const token = localStorage.getItem(TOKEN_KEY);
      const formData = new FormData();
      formData.set("message", values.message);
      formData.set("image", values.image[0].originFileObj);

      const { lat, lon } = JSON.parse(localStorage.getItem(POST_KEY));
      formData.set("lat", lat);
      formData.set("lon", lon);

      fetch(`${API_ROOT}/post`, {
        method: "POST",
        headers: {
          Authorization: `${AUTH_HEADER} ${token}`
        },
        body: formData
      })
        .then(response => {
          if (response.ok) {
            this.form.resetFields();
            this.setState({ visible: false, confirmLoading: false });
            this.props.loadNearbyPosts();
            return;
          }
          throw new Error(response.statusText);
        })
        .catch(e => {
          console.log(e);
          this.setState({ confirmLoading: false });
          message.error("Failed to create the post.");
        });
    });
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  getFormRef = formInstance => {
    this.form = formInstance;
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create New Post
        </Button>
        <Modal
          title="Create New Post"
          visible={visible}
          onOk={this.handleOk}
          okText="Create"
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <CreatePostForm ref={this.getFormRef} />
        </Modal>
      </div>
    );
  }
}
