import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-blog-dialog',
  templateUrl: './edit-blog-dialog.component.html',
  styleUrls: ['./edit-blog-dialog.component.css']
})
export class EditBlogDialogComponent {

  blogTitle: string = "";
  blogBody: string = "";
  fontStyle: string = "";
  fontColor: string = "";
  backgroundColor: string = "";
  imageURL: string = "";
  fontSize: number = 18;
  error: boolean = false;
  
  fonts = ["Arial, sans-serif",
    "Helvetica, sans-serif",
    "Verdana, sans-serif",
    "Trebuchet MS, sans-serif",
    "Gill Sans, sans-serif",
    "Noto Sans, sans-serif",
    "Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif",
    "Optima, sans-serif",
    "Arial Narrow, sans-serif",
    "sans-serif",
    "Times, Times New Roman, serif",
    "Didot, serif",
    "Georgia, serif",
    "Palatino, URW Palladio L, serif",
    "Bookman, URW Bookman L, serif",
    "New Century Schoolbook, TeX Gyre Schola, serif",
    "American Typewriter, serif",
    "serif",
    "Andale Mono, monospace",
    "Courier New, monospace",
    "Courier, monospace",
    "FreeMono, monospace",
    "OCR A Std, monospace",
    "DejaVu Sans Mono, monospace",
    "monospace",
    "Comic Sans MS, Comic Sans, cursive",
    "Apple Chancery, cursive",
    "Bradley Hand, cursive",
    "Brush Script MT, Brush Script Std, cursive",
    "Snell Roundhand, cursive",
    "URW Chancery L, cursive",
    "cursive",
    "Impact, fantasy",
    "Luminari, fantasy",
    "Chalkduster, fantasy",
    "Jazz LET, fantasy",
    "Blippo, fantasy",
    "Stencil Std, fantasy",
    "Marker Felt, fantasy",
    "Trattatello, fantasy",
    "fantasy"
  ];
  colors = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];
  
  constructor(private data: DataService, private dialogRef: MatDialogRef<EditBlogDialogComponent>) {
    this.blogTitle = this.data.fullBlog.title;
    this.blogBody = this.data.fullBlog.body;
    this.fontStyle = this.data.fullBlog.fontStyle;
    this.fontColor = this.data.fullBlog.fontColor;
    this.backgroundColor = this.data.fullBlog.backgroundColor;
    this.imageURL = this.data.fullBlog.imageURL;
    this.fontSize = this.data.fullBlog.fontSize;
  }

  cancelEdit() {
    this.blogTitle = this.data.fullBlog.title;
    this.blogBody = this.data.fullBlog.body;
    this.fontStyle = this.data.fullBlog.fontStyle;
    this.fontColor = this.data.fullBlog.fontColor;
    this.backgroundColor = this.data.fullBlog.backgroundColor;
    this.imageURL = this.data.fullBlog.imageURL;
    this.fontSize = this.data.fullBlog.fontSize;
    this.error = false;
  }

  saveBlog() {
    if(this.fontSize > 30 || this.fontSize < 12){
      this.data.errorMsg = "Invalid font size";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }

    if(this.blogTitle === "" || this.blogBody === "" || this.imageURL === ""){
      this.data.errorMsg = "Please fill out required fields";
      this.data.$errorMsg.next(this.data.errorMsg);
      this.error = true;
      return;
    }
    
    if(this.fontStyle === ""){
      this.fontStyle = "Times, Times New Roman, serif";
    }

    if(this.fontColor === ""){
      this.fontColor = "white"
    }

    if(this.backgroundColor === ""){
      this.backgroundColor = "#303030";
    }
    
    this.data.fullBlog.title = this.blogTitle;
    this.data.fullBlog.body = this.blogBody;
    this.data.fullBlog.fontStyle = this.fontStyle;
    this.data.fullBlog.fontColor = this.fontColor;
    this.data.fullBlog.backgroundColor = this.backgroundColor;
    this.data.fullBlog.imageURL = this.imageURL;
    this.data.fullBlog.fontSize = this.fontSize;
    this.data.fullBlog.dateUpdated = new Date().toString();
    this.data.updateBlog(this.data.fullBlog);
    this.data.$fullBlog.next(this.data.fullBlog);
    this.data.$currentPage.next(this.data.currentPage);
    this.dialogRef.close();
  }

  badImg(event: ErrorEvent) {
    // @ts-ignore
    event.target.src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';
  }
}
