import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {checkToken} from '../api/usersApi'
import { connect } from 'react-redux'
import {setCurrentUserAction} from '../redux/actions'

export default function withAuth(ComponentToProtect) {
  class Comp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      checkToken().then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
          this.props.setCurrentUserAction(res.data.user)
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }).catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
  const mapDispatchToProps = (dispatch) => ({
    setCurrentUserAction: (user) => dispatch(setCurrentUserAction(user))
  });
  return connect(null, mapDispatchToProps)(Comp)
}

 