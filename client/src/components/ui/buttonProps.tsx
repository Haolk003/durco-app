import { styled } from "@mui/material/styles";
import { Button, ButtonProps } from "@mui/material";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#464471"),
  backgroundColor: "#464471",
  "&:hover": {
    backgroundColor: "#464471",
  },
}));
export default ColorButton;
