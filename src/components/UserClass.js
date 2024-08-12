import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props);
        this.state = 
        {
            userInfo: {
                name: "Dummy",
                location: "Dummy"
            }
        };
    }

    async componentDidMount(){
        const data = await fetch("https://api.github.com/users/KumailIqbal");
        const json = await data.json();
        this.setState({
            userInfo: json
        })
        console.log(json);
    }

    render(){

        const {name, location, avatar_url} = this.state.userInfo;
        return(
            <div className="m-2 p-2 border border-solid border-black w-[200] rounded-md">
                <img src={avatar_url} className="rounded-2xl"></img>
                <h2 className="font-serif font-bold text-lg">{name} </h2>
                <h2 className="font-serif">{location}</h2>
            </div>
        )
    }
}

export default UserClass;