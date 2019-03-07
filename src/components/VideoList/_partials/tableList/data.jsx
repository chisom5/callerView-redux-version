import React from "react";

export const video = [
  {
    numberOfUsage: 0,
    _id: "5c5054dfa2b3d542fa9bc739",
    name: "Kristofer Johnston PhD",
    link:
      "https://www.deckow.net/suscipit-sapiente-non-sunt-recusandae-quaerat",
    category: "ut",
    region: "Michigan",
    releaseDate: "18/08/2004"
  },
  {
    numberOfUsage: 0,
    _id: "5c5054dfa2b3d542fa9bc73b",
    name: "Talon Heller",
    link: "http://hills.com/cum-amet-est-dolorem-ex-quas.html",
    category: "facere",
    region: "Pennsylvania",
    releaseDate: "13/11/1990"
  }
];



export const columns = [
  {
    dataField: "name",
    text: "Name"
  },
  {
    dataField: "category",
    text: "Category"
  },
  {
    dataField: "link",
    text: "URL/Link"
  },
  {
    dataField: "region",
    text: "Region"
  },
  {
    dataField: "releaseDate",
    text: "Release Date"
  },
  {
    dataField: "image",
    text: "Image"
  },
  {
    dataField: "actions",
    text: "",
    formatter: (cell, row) => (
      <span className="group-icon">
        <button>
          <img
            src={require('../../../../assets/imgs/actions/deleteIcon.svg')}
            alt="delete-icon"
          />
        </button>

        <button>
          <img
            src={require('../../../../assets/imgs/actions/editIcon.svg')}
            alt="edit-icon"
          />
        </button>
      </span>
    )
  }
];
