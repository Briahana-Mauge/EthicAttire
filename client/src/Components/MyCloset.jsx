import React from "react";
import axios from "axios";
import GetItems from "./GetItems";
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import ClosetScore from './ClosetScore';
import ItemUpload from './ItemUpload'
import "../App.css";

class MyCloset extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '1',
            data: []
        }
    }

    async componentDidMount() {
            console.log(this.state.data);

            try {
                let clothes = await axios.get(`http://localhost:3000/items/types`);
                console.log("clothes:", clothes);
                console.log("clothes.data:", clothes.data)
                console.log("clothes.data.payload[0].id:", clothes.data.payload[0].id);
                this.setState({
                    data: clothes.data.payload
                });
                let newData = [...this.state.data];
                console.log("newData:", newData);
                clothes.data.payload.map(element => {
                    newData.push(element.item_type)
                });

                console.log("state:", this.state);

            } catch (err) {
                console.log("ERROR:", err);
        }
    }

    render() {
        const { user, data, clothesId } = this.state;
        console.log("render method data:", data);
        return (
            <div id="myClosetContiner">
                <ClosetScore />
                <ItemUpload />
                <div className="componentHeaderDiv">
                    <h2 id="ClothingChecklistHeaderTag" className="componentHeaderTag">Clothing Checklist</h2>
                </div>
                <div id="myClosetContentDiv">
                    <div className="myClosetClothes">
                        {
                        // this.state.data 
                        // ? (
                        //     <Link to={`/closet/user/${user}/clothes/${clothesId}`}>
                        //         <GetItems data={data} />
                        //    </Link>
                        // ) 
                        // : null
                        }
                        {
                            data.map(element => {
                                return (
                                    <div className="FabricTypeDiv"> 
                                        <Link to={`/closet/user/${user}/clothes/${element.id}`}><p className="myClosetClothes">{element.clothes_type}</p></Link>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default MyCloset;