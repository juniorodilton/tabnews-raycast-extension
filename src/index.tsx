import { ActionPanel, Detail, List, Action, Icon } from "@raycast/api";
import { useFetch, usePromise } from "@raycast/utils";
import { fetchContents } from "./tabnews";
import { useEffect, useState } from "react";
import { PostResponse, Strategy } from "./types";
import { getIcon } from "./utils";

export default function Command() {
  const [strategya, setStrategy] = useState<Strategy>();
  const { isLoading, data } = fetchContents({ strategy: strategya });

  return (
    <List
      isLoading={isLoading}
      searchBarAccessory={
        <List.Dropdown
          tooltip="Select Sort"
          storeValue
          defaultValue={Strategy.Relevant}
          onChange={(newValue) => setStrategy(newValue as Strategy)}
        >
          {Object.entries(Strategy).map(([name, value]) => (
            <List.Dropdown.Item key={value} title={name} value={value} />
          ))}
        </List.Dropdown>
      }
    >
      {data?.map((item, index) => (
        <List.Item
          title={item.title}
          key={item.id}
          subtitle={item.owner_username}
          icon={getIcon(index + 1)}
          accessories={[
            { icon: Icon.Bubble, text: item.children_deep_count.toString() },
            {
              icon: Icon.StarCircle,
              text: item.tabcoins.toString(),
            },
          ]}
        />
      ))}
    </List>
  );
}
