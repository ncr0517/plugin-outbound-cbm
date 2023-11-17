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
        <MenuItem {...menu} onClick={() => props.onClickHandler("OPEN_CHAT")}>
          ....and open chat with customer (route reply to me)
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
          ....and send to pre-agent bot (route reply based off needs)
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          {...menu}
          onClick={() => props.onClickHandler("OVERRIDE")}
        >
          ....OVERRIDE OPEN CONV (double check no other agent)
        </MenuItem>
      </Menu>
    </>
  );
};

export default SendMessageMenu;
