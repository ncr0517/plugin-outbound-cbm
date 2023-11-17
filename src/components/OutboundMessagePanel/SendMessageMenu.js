import {
  MenuButton,
  MenuItem,
  Menu,
  MenuSeparator,
  useMenuState,
} from "@twilio-paste/core";
import { ChevronDownIcon } from "@twilio-paste/icons/esm/ChevronDownIcon";

const SendMessageMenu = (props) => {
  const menu = useMenuState();
  return (
    <>
      <MenuButton {...menu} variant="primary" disabled={props.disableSend}>
        Send message.... <ChevronDownIcon decorative />
      </MenuButton>
      <Menu {...menu} aria-label="Actions">
        <MenuItem
          {...menu}
          // onClick={() => { 
          //   props.onClickHandler("OVERRIDE");
          //   if (window.confirm('Are you sure you want to delete the current conversation?')) {
          //     props.onClickHandler("OVERRIDE");
          //     }
          //     }}
          onClick={() => props.onClickHandler("OVERRIDE")}
        >
          OVERRIDE OPEN CONVO (DOUBLE CHECK UNUSED)
        </MenuItem>
        <MenuSeparator />
        {/* <MenuItem
          {...menu}
          onClick={() => props.onClickHandler("SEND_MESSAGE_REPLY_ME")}
        >
          ....and open chat with customer when they reply (route reply to me)
        </MenuItem> */}
        <MenuItem
          {...menu}
          onClick={() => props.onClickHandler("SEND_MESSAGE")}
        >
          SEND TO PRE-AGENT BOT (ROUTE TO ANY AGENT)
        </MenuItem>
        <MenuSeparator />
        <MenuItem 
        {...menu} 
        onClick={() => props.onClickHandler("OPEN_CHAT")} >
          OPEN CHAT WITH CUSTOMER (ROUTE TO ME)
        </MenuItem>
        
      </Menu>
    </>
  );
};

export default SendMessageMenu;
