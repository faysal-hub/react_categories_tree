import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faCircleChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import './Category.css';

import Categories from '../Categories/Categories';
import Modal from '../Modal/Modal';

class Category extends Component {
  constructor(props) {
    super(props);
    //set initial state
    this.state = {
      subOptionsVisible: true,
      showModal: false,
      edit: false,
      title: null,
      value: null,
      saveIndex: null,
    };
  }

  //handle click on category title for level collapse
  titleHandleClick = () => {
    this.setState({
      subOptionsVisible: !this.state.subOptionsVisible,
    });
  };

  // function to handle click on add button
  addHandleClick = () => {
    this.props.add();
    this.setState({
      subOptionsVisible: true,
    });
  };

  // function for opening the modal
  editTrigger = (title) => {
    this.setState({
      edit: true,
      value: title,
      title: title,
      showModal: true,
    });
  };

  // function for closing the modal
  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  // function to handle change in title input field
  titleChangedHandler = (event) => {
    const entryIndex = this.props.entry.subOptions.findIndex((s) => {
      return s.title === this.state.title;
    });
    const option = { ...this.props.entry.subOptions[entryIndex] };
    option.title = event.target.value;
    const options = [...this.props.entry.subOptions];
    options[entryIndex] = option;
    this.setState({
      edit: true,
      value: option.title,
      saveIndex: entryIndex,
    });
  };

  // function to handle save button
  saveHandler = () => {
    if (this.props.entry.subOptions[this.state.saveIndex]) {
      this.props.entry.subOptions[this.state.saveIndex].title =
        this.state.value;
    }
    this.setState({
      edit: false,
    });
  };

  render() {
    // get the entry from props
    const hasSubOptions = this.props.entry.subOptions ? true : false;

    return (
      <>
        {/* render a category */}
        <div className="entry-container">
          <div className="entry">
            {/* render the title of the category */}
            <p
              onClick={this.titleHandleClick}
              style={{
                cursor:
                  hasSubOptions && this.props.entry.subOptions.length
                    ? 'pointer'
                    : 'default',
                color: !!this.props.entry.subOptions.length
                  ? '#262626'
                  : '#5eaaa8',
              }}
            >
              <FontAwesomeIcon icon={faCircleChevronDown} />
              {` ${this.props.entry.title}`}
            </p>
            {/* render the add, edit and delete button */}
            <div className="controls">
              {/* add button */}
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-top`}>Add a Child</Tooltip>}
              >
                <Button
                  variant="success"
                  className="mx-1 btn"
                  type="button"
                  onClick={this.addHandleClick}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </OverlayTrigger>

              {/* loop through edit & delete buttons */}
              {this.props.entry.title !== 'Category article' && [
                //edit button
                <OverlayTrigger
                  key="editbtn"
                  placement="top"
                  overlay={<Tooltip id={`tooltip-top`}>Edit the child</Tooltip>}
                >
                  <Button
                    className="mx-1 btn"
                    type="button"
                    onClick={this.props.edit}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </OverlayTrigger>,
                // delete button
                <OverlayTrigger
                  key="deletebtn"
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-top`}>Delete the Child</Tooltip>
                  }
                >
                  <Button
                    variant="danger"
                    className="mx-1 btn"
                    type="button"
                    onClick={this.props.delete}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </OverlayTrigger>,
              ]}
            </div>
          </div>
          {/* conditional rendering for sub options */}
          {hasSubOptions && this.state.subOptionsVisible && (
            <div>
              <ul style={{ listStyleType: 'none', paddingLeft: '15px' }}>
                <Categories
                  entries={this.props.entry.subOptions}
                  trigger={() => {
                    this.setState({ subOptionsVisible: true });
                  }}
                  editTrigger={this.editTrigger}
                />
              </ul>
            </div>
          )}
        </div>
        {/* render category edit form */}
        {this.state.edit && (
          <Modal
            title={this.state.title}
            changeTitle={this.titleChangedHandler}
            value={this.state.value}
            saveHandler={this.saveHandler}
            showModal={this.state.showModal}
            closeModal={this.onCloseModal}
          />
        )}
      </>
    );
  }
}

export default Category;
