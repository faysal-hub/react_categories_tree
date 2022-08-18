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

import Categories from '../Categories';

class Category extends Component {
  constructor(props) {
    super(props);
    //set initial state
    this.state = { subOptionsVisible: true };
  }

  //handle click on category title
  handleClick = () => {
    this.setState({
      subOptionsVisible: !this.state.subOptionsVisible,
    });
  };

  //add suboption
  addHandleClick = () => {
    this.props.add();
    this.setState({
      subOptionsVisible: true,
    });
  };

  //edit category
  editTrigger = (title) => {
    this.setState({
      edit: true,
      value: title,
      title: title,
    });
  };

  //Change the Category title
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

  //save new title
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
    const hasSubOptions = this.props.entry.subOptions ? true : false;

    return (
      <>
        {/* render category edit form */}
        {this.state.edit && (
          <div className="editor">
            <p>Enter new title for {this.state.title}:</p>
            <input
              type="text"
              onChange={this.titleChangedHandler}
              value={this.state.value}
            />
            <button
              className="save-btn"
              type="button"
              onClick={this.saveHandler}
            ></button>
          </div>
        )}
        {/* render category */}
        <div className="entry-container">
          <div className="entry">
            <p
              onClick={this.handleClick}
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
          {/* render suboptions */}
          {hasSubOptions && this.state.subOptionsVisible && (
            <div>
              <ul style={{ listStyleType: 'none' }}>
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
      </>
    );
  }
}

export default Category;
