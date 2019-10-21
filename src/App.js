import React, { Component } from "react";
import Chart from "react-google-charts";
import './App.css';
class App extends Component {
  render() {
    let { xhr } = this.props;
    xhr.onload = () => {
      if (xhr.status !== 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else {
        this.setState({ data: JSON.parse(xhr.response) });
      }
    };
    return (
      <div>
        {this.state ? (
            <div>
          <Chart
          className="table"
            // width={'500px'}
            // height={'300px'}
            chartType="Table"
            loader={<div>Loading Chart</div>}
            
            data={this.createData([
                { type: "string", id: "Index"},
                { type: "string", label: "Name" },
                { type: "date", label: "Start Date" },
                { type: "date", label: "Due Date" },
                
              ])}
            options={{
              showRowNumber: false,
              
            }}
            rootProps={{ "data-testid": "1" }}
            
          />
          <Chart
            chartType="Timeline"
            className="timeline"
            loader={<div>Loading Chart</div>}
            data={this.createData([
                { type: "string", id: "Index"},
                { type: "string", id: "Name" },
                { type: "date", id: "Start Date" },
                { type: "date", id: "Due Date" }
              ])}
            rootProps={{ "data-testid": "2" }}
          />
        </div>) : null}
       
      </div>
    );
  }
  getDate = str => { //converts date in dd/mm/yyyy form to standard Javascript Date form
    let arr = str.split("/");
    let ret = new Date(arr[2] + "-" + arr[1] + "-" + arr[0]);
    return ret;
  };
  createData = (head) => { //creates a table with the field names given by the head
    
    let ret = [];
    ret.push(head);
    this.state.data.forEach((obj,ind) => {
        
      ret.push([(ind+1).toString(),obj.name, this.getDate(obj.start), this.getDate(obj.end)]);
    });
    return ret;
  };
}

export default App;
