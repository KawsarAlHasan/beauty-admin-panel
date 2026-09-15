import { message } from "antd";

export default function CatchError(error, fallbackMessage) {
  return message.error(error?.response?.data?.message || fallbackMessage);
}
