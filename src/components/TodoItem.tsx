import React, {Component} from "react";
import {Button, Card, Checkbox, Col, Modal} from "antd";
import Todo from "../services/Todo";
import styles from "./styles.module.css";
import {deleteTodoById} from "../services/todoService";
import TodoUpdateModal from "./TodoUpdateModal";

interface TodoProp {
    todo: Todo;
    reload(): void;
}

interface TodoState {
    modalVisible: boolean;
    updateVisible: boolean;
    updateModalVisible: boolean;
}


class TodoItem extends Component<TodoProp, TodoState> {

    constructor(props: TodoProp) {
        super(props);
        this.state = {
            modalVisible: false,
            updateVisible: false,
            updateModalVisible: false,
        }
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    handleOk = () => {
        this.setState({
            modalVisible: false,
            updateModalVisible: false
        });
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
            updateModalVisible: false
        });
    };

    handleUpdate = () => {
        this.setState({
            updateModalVisible: true,
        })
    }


    deleteTodo = () => {
        if (this.props.todo.id != null && this.props.todo.complete) {
            deleteTodoById(this.props.todo.id).then(() => this.props.reload);
        } else {
            this.showModal();
        }
    }

    render() {
        return (
            <Col className="gutter-ro" span={6}>
                <Card title={this.props.todo.title} className={styles.todoCard}>
                    <p>Description:</p>
                    <p>{this.props.todo.description}</p>
                    <p>Complete: <Checkbox defaultChecked={this.props.todo.complete} disabled/></p>
                    <Button type="primary" onClick={this.handleUpdate}>Update</Button>
                    <Button type="primary" danger onClick={this.deleteTodo}>
                        Delete
                    </Button>
                    <Modal
                        title="Delete Todo"
                        visible={this.state.updateVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p className={styles.dangerDeleteTodo}>In order to delete a todo, it Must be completed!</p>
                    </Modal>
                    <TodoUpdateModal visible={this.state.updateModalVisible}
                                     todo={this.props.todo}
                                     onCancel={this.handleCancel}
                                     reload={this.props.reload} />
                </Card>
            </Col>
        )
    }
}

export default TodoItem;