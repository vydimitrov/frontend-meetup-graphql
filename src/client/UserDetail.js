import React, { Component } from "react";
import { graphql } from "react-apollo";
import getUserDetailQuery from "./API/getUserDetail.graphql";

@graphql(getUserDetailQuery, {
  options: (props) => {
    return {
      variables: {
        githubUsername: props.user.github.id
      }
    };
  }
})
class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: 'Pavel',
        lastName: 'Polacek',
        github: {
          id: 'polacekpavel',
          avatarSrc: 'abc.png',
          location: 'Prague',
          events: [{
            eventType: 'fork',
            url: 'https://github.com/apollostack/apollo-client',
            urlName: 'Apollo client',
            weather: {
              condition: 'fog'
            }
          }]
        }
      }
    };
  }

  render() {
    return (
      <div>
        <button className={'btn btn-danger'}
                onClick={() => this.props.onBack()}>
          Back
        </button>
        <div>
          <h3>{this.props.user.firstName} {this.props.user.lastName}
            {' - '} {this.props.user.github && (this.props.user.github.id)} </h3>
        </div>
        <div>
          <img src={this.props.data.user && this.props.data.user.github.avatarSrc } width={50} height={50}/>
        </div>
        <p>{this.props.data.user && this.props.data.user.github.location }</p>
        <table className="eventTable">
          <tbody>
          <tr>
            <th>
              Event type
            </th>
            <th>
              Url
            </th>
            <th>
              Weather
            </th>
          </tr>
          {this.props.data.user && this.props.data.user.github.events.map((event, index) => {
            return (
              <tr key={index}>
                <td>{event.eventType}</td>
                <td>
                  <a href={event.url}>{event.urlName}</a>
                </td>
                <td><img src={`weather/${event.weather.condition}.png`} width={24} height={24}/></td>
              </tr>
            );
          }) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserDetail;