import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const HelpTooltip = ({ content }) => (
  <span className="relative ml-1">
    <span className="group inline-block">
      <HelpOutlineIcon sx={{ fontSize: 20, cursor: 'pointer' }} />
      <p className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 min-w-[200px] border rounded-sm text-sm shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {content}
      </p>
    </span>
  </span>
);
