import { defineStore } from "pinia"


export const genreList=defineStore({
    id:'genre',
    data() {
  return {
    items: [
      { id:1,label:"Sci-fi" },
      { id:2,label:"Horror" },
      { id:3,label:"Action" }, 
      { id:4,label:"Comedie"}, 
      { id:5,label:"Indie"  }, 
      { id:6,label:"Rom-com" }
    ]
  }
}

});