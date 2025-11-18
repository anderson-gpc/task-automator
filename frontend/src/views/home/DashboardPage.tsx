"use client";

import { useSession } from "next-auth/react";
import { Session } from "@auth/core/types";
import { Flex, Card, Splitter } from "antd";
import useDashboardStyles from "@/assets/css/__dashboard.style";
import { ThreeDot } from "react-loading-indicators";
import { Colors } from "@/constants/colors";

import { useDashboardData } from "@/hooks/useDashboardData";
import {
  removeFollowerAction,
  openInNewTab,
} from "@/actions/github/github-action";

import NetworkComponent from "@/components/Network";
import IssueCard from "@/components/IssueCard";

export default function DashboardPage() {
  const data = useSession();
  if (!data || !data.data) return;
  const session: Session = data.data;
  if (!session) return;
  if (!session?.acessToken) return;
 
  const { mutualFollowers, nonFollowers, issues, loading } =
    useDashboardData(session);

  const { styles } = useDashboardStyles();
  if (loading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}
      >
        <ThreeDot
          color={Colors.DeepVioletActive}
          text="Carregando"
          variant="bob"
          textColor={Colors.DeepVioletActive}
        />
      </Flex>
    );

  return (
    <Flex className={styles.dashboard}>
      <Splitter className={styles.splitter}>
        <Splitter.Panel collapsible={{ start: true, end: true }}>
          <Card title="Seguidores mútuos">
            {mutualFollowers.map((element: any) => (
              <NetworkComponent
                key={element.id}
                data={element}
                onRemove={() => removeFollowerAction(session, element.login)}
                onView={() => openInNewTab(element.html_url)}
              />
            ))}
          </Card>
        </Splitter.Panel>

        <Splitter.Panel collapsible={{ start: true, end: true }}>
          <Card title="Não seguidores">
            {nonFollowers.map((element: any) => (
              <NetworkComponent
                key={element.id}
                data={element}
                onRemove={() => removeFollowerAction(session, element.login)}
                onView={() => openInNewTab(element.html_url)}
              />
            ))}
          </Card>
        </Splitter.Panel>

        <Splitter.Panel collapsible={{ start: true, end: true }}>
          <Card title="Issues recebidas">
            <Flex vertical>
              {issues.map((issue: any) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onView={(issue) => openInNewTab(issue.html_url)}
                />
              ))}
            </Flex>
          </Card>
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
}
