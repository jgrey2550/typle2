import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";

function SkinsList() {
    const apiUrl = 'https://typle-omega.vercel.app';
    //switch to http://localhost:5000 when on local
    
    const {user} = useContext(UserContext);
    const [skins, setSkins] = useState(null);

    useEffect(() => {
        if(user) {
            axios.get(`${apiUrl}/api/userProfile/${user}`)
                .then(response => {
                    setSkins(response.data.skins);
                })
                .catch(error => {
                    console.log("error fetching skins " + error);
                })
        }
    })

    function changeEquiptSkin(newSkin) {
      if(user) {
        alert("Changed skin to " + newSkin);
        axios.put(`${apiUrl}/api/userProfile/${user}/equiptSkin`, {newSkin})
        .then(response => {
            console.log('User profile updated:', response.data);
        })
        .catch(error => {
            console.error('Error updating user profile:', error);
        });
      }
    }

    function renderOwnedSkins(items) {
        if (items === null) {
          return <p>You don't own any skins!</p>;
        }
        const ownedSkins = items.filter(item => item.name);
        return ownedSkins.map((item, index) => (
          <div className="profile-skins" key={index}>
            <p key={index}>
              Skin: {item.name}
            </p>
            <button onClick={() => changeEquiptSkin(item.name)}>Equipt</button>
          </div>
        ));
      }

    return <div>
        <h1>Owned Skins:</h1>
        {renderOwnedSkins(skins)}
    </div>
}

export default SkinsList;
