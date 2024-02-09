import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

function JobCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={3}>
          <Box>
            <Skeleton
              variant="squre"
              width={40}
              height={40}
              sx={{ borderRadius: "10px", marginTop: "8px" }}
            />
          </Box>
          <Stack direction="column" spacing={1}>
            <Box>
              <Typography variant="h1" width={650}>
                <Skeleton />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" width={500}>
                <Skeleton />
              </Typography>
              <Typography variant="h6" width={500}>
                <Skeleton />
              </Typography>
              <Typography variant="h6" width={500}>
                <Skeleton />
              </Typography>
              <Typography variant="h6" width={500}>
                <Skeleton />
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default JobCardSkeleton;
