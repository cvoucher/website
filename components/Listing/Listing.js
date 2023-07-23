import { List, ListItem, ListItemIcon, ListItemText, createTheme } from "@mui/material";

const ListItemTheme = createTheme(() => {
  
});

const ListingItem = ({iconStyle, icon, textStyle, text, style}) => {
  return (
    <ListItem disablePadding={true} style={style}>
      <ListItemIcon style={{...iconStyle, minWidth: "40px"}} xs={1}>
        {icon}
      </ListItemIcon>
      <ListItemText sx={{'& .MuiListItemText-primary': textStyle}} primary={text} />
    </ListItem>
  );
}

const NumberedListingItem = ({number, text, textStyle}) => {
  return (
    <ListItem disablePadding={true}>
      <ListItemIcon>
        <span style={{color: "#333", fontSize: "1.2rem"}}>{number}</span>
      </ListItemIcon>
      <ListItemText sx={{'& .MuiListItemText-primary': textStyle}} primary={text} />
    </ListItem>
  ); 
}



const Listing = ({children}) => {
  return (
    <List sx={{ width: '100%' }}>
      {children}
    </List>
  );
}

export {
  Listing,
  ListingItem,
  NumberedListingItem
};