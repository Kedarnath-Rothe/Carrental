import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './../store/auth';




const AdminContacts = () => {

  const [contactData, setContactData] = useState([]);

  const { user, authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch("https://carrental-khaki.vercel.app/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      })

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setContactData(data);
      }

    }
    catch (error) {
      console.log(error);
    }
  }


  //Define the function for the delete contacts

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`https://carrental-khaki.vercel.app/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        }
      })

      if (response.ok) {
        getContactsData();
        toast.success("Deleted Successfully...");
      }
      else {
        toast.error("Not Deleted...");
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  function viewAadharImage(imageUrl) { 
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const popupWidth = 600; // Adjust this width as needed
    const popupHeight = 400; // Adjust this height as needed
    const leftPosition = (screenWidth - popupWidth) / 2;
    const topPosition = (screenHeight - popupHeight) / 2;
  
    // Open the image in a popup window
    const popupWindow = window.open("", "_blank", `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition}`);
  
    // Write HTML to the popup window to display the image
    popupWindow.document.write(`<img src="${imageUrl}" alt="Aadhar Card Image" />`);
  }
  
  
  useEffect(() => {
    getContactsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (!user.isAdmin) {
    return <Navigate to="/userhome" />
  }

  return (
    <>
      <section className="admin-contacts-section" >
        <div className="container">
          <h1>Admin Contact Data</h1>
        </div>

        <div className="container admin-users">
          {contactData.map((curElem, index) => {
            const { _id, username, email, message, aadhar_card } = curElem;

            return (
              <div key={index}>
                <p><strong>{username}</strong></p>
                <p><i>{email}</i></p>
                <p>{message}</p>
                {aadhar_card && (
                  <p className="aadhar" onClick={() => viewAadharImage(`${aadhar_card}`)} > 
                      View Aadhar 
                  </p>
                )}
                <button className="btn" onClick={() => deleteContactById(_id)}>delete</button>
              </div>
            );
          })}
        </div>

      </section>
    </>
  )
}

export default AdminContacts
