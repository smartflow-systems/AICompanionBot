import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { TrendingUp, Users, Heart, MessageCircle, BarChart3 } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

export default function EnhancedAnalytics() {
  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  // Chart configurations with SFS theme
  const chartColors = {
    primary: "#FFD700",
    secondary: "#3E2723",
    success: "#4CAF50",
    warning: "#FF9800",
    danger: "#F44336",
    info: "#2196F3"
  };

  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [65, 78, 85, 92, 88, 95, 87],
        borderColor: chartColors.primary,
        backgroundColor: `${chartColors.primary}20`,
        tension: 0.4,
        pointBackgroundColor: chartColors.primary,
        pointBorderColor: '#000',
        pointBorderWidth: 2,
      },
    ],
  };

  const botTypeData = {
    labels: ['Content Creator', 'Engagement', 'Follower', 'Analytics'],
    datasets: [
      {
        data: [35, 28, 22, 15],
        backgroundColor: [
          chartColors.primary,
          chartColors.success,
          chartColors.info,
          chartColors.warning,
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Success Rate',
        data: [78, 85, 92, 89],
        backgroundColor: chartColors.primary,
        borderColor: chartColors.primary,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#FFD700',
          font: {
            family: 'Inter',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#808080',
        },
        grid: {
          color: '#3E272320',
        },
      },
      y: {
        ticks: {
          color: '#808080',
        },
        grid: {
          color: '#3E272320',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#FFD700',
          font: {
            family: 'Inter',
          },
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card-brown border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-sfs-gold/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-sfs-gold" />
              </div>
              <div>
                <p className="text-sm text-sfs-gray">Total Growth</p>
                <p className="text-2xl font-bold text-sfs-gold">+24.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-brown border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-sfs-gray">New Followers</p>
                <p className="text-2xl font-bold text-sfs-gold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-brown border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-sfs-gray">Total Likes</p>
                <p className="text-2xl font-bold text-sfs-gold">8,942</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-brown border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-sfs-gray">Comments</p>
                <p className="text-2xl font-bold text-sfs-gold">2,156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card-brown border-0">
          <CardHeader>
            <CardTitle className="text-heading text-lg text-sfs-gold flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Engagement Trends
              <Badge className="ml-auto bg-sfs-gold/10 text-sfs-gold border-sfs-gold/30">
                7 Days
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px' }}>
              <Line data={engagementData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-brown border-0">
          <CardHeader>
            <CardTitle className="text-heading text-lg text-sfs-gold">
              Bot Performance Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px' }}>
              <Doughnut data={botTypeData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-brown border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-heading text-lg text-sfs-gold">
              Success Rate by Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '300px' }}>
              <Bar data={performanceData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}