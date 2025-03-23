import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabList = [
  {
    value: "navigation",
    label: "Navigation",
  },
  {
    value: "banner",
    label: "Banner",
  },
  {
    value: "features",
    label: "Features",
  },
  {
    value: "forms",
    label: "Forms",
  },
];

const Home = () => {
  return (
    <div className="w-full  max-w-[1540px] mx-auto  px-[20px] h-screen mt-5">
      <div className="flex gap-10 items-center">
        <div>
          <Tabs defaultValue="account" className="w-[500px] ">
            <TabsList className="grid w-full grid-cols-5 cursor-pointer">
              {tabList.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="cursor-pointer"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* navigation */}
            <TabsContent value="navigation">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div></div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* banner */}
            <TabsContent value="banner">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div></div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* banner */}
            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div></div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
