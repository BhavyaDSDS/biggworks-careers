import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

function FiltersSkeleton() {
  const largeArray = Array.from({ length: 11 });
  const smallArray = Array.from({ length: 3 });

  return (
    <>
      <Card>
        <CardContent>
          <Stack direction="column" spacing={4}>
            <Stack direction="column" spacing={1}>
              <Typography variant="h2" width={250}>
                <Skeleton />
              </Typography>
              <Box>
                {smallArray.map((_, idx) => (
                  <Typography variant="h6" key={idx} width={160}>
                    <Skeleton />
                  </Typography>
                ))}
              </Box>
            </Stack>

            <Stack direction="column" spacing={1}>
              <Typography variant="h3" width={250}>
                <Skeleton />
              </Typography>
              <Box>
                {largeArray.map((_, idx) => (
                  <Typography variant="h6" key={idx} width={160}>
                    <Skeleton />
                  </Typography>
                ))}
              </Box>
            </Stack>

            <Stack direction="column" spacing={1}>
              <Typography variant="h3" width={250}>
                <Skeleton />
              </Typography>
              <Box>
                {largeArray.map((_, idx) => (
                  <Typography variant="h6" key={idx} width={160}>
                    <Skeleton />
                  </Typography>
                ))}
              </Box>
            </Stack>

            <Stack direction="column" spacing={1}>
              <Typography variant="h3" width={250}>
                <Skeleton />
              </Typography>
              <Box>
                {largeArray.map((_, idx) => (
                  <Typography variant="h6" key={idx} width={160}>
                    <Skeleton />
                  </Typography>
                ))}
              </Box>
            </Stack>

            <Stack direction="column" spacing={1}>
              <Typography variant="h3" width={250}>
                <Skeleton />
              </Typography>
              <Box>
                {largeArray.map((_, idx) => (
                  <Typography key={idx} variant="h6" width={160}>
                    <Skeleton />
                  </Typography>
                ))}
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default FiltersSkeleton;
