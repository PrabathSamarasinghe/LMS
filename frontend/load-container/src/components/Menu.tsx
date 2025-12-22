import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

interface MenuItemType {
  label: string;
  onClick?: () => void;
  divider?: boolean;
}

interface CustomMenuProps {
  items: MenuItemType[];
  variant?: "outlined" | "contained" | "text";
  size?: "small" | "medium" | "large";
}

export default function CustomMenu({
  items,
  variant = "text",
  size = "medium",
}: CustomMenuProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleMenuItemClick = (callback?: () => void) => {
    callback?.();
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        variant={variant}
        size={size}
        onClick={handleToggle}
        className="text-gray-700 hover:bg-gray-100"
        sx={{
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "#f3f4f6",
          },
        }}
      >
        <PersonRoundedIcon fontSize="medium" className="mr-2 text-gray-500" />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper className="shadow-lg">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  onKeyDown={handleListKeyDown}
                  className="min-w-max"
                >
                  {items.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleMenuItemClick(item.onClick)}
                      divider={item.divider}
                      className="text-xs hover:bg-gray-50 z-50"
                      sx={{
                        py: 1,
                        px: 2,
                        "&:hover": {
                          backgroundColor: "#f9fafb",
                        },
                      }}
                    >
                      <span>{item.label}</span>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
