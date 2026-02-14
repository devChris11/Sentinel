import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { RiskHeader } from '@/components/risk-scoring/risk-header';
import { users } from '@/lib/risk-data';

// Default wrapper with no selections
function RiskHeaderWrapper() {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score-desc");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [trendFilter, setTrendFilter] = useState("all");
  const [selectedUsersCount] = useState(0);

  return (
    <div className="bg-content-bg min-h-screen">
      <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
        <RiskHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          riskFilter={riskFilter}
          onRiskFilterChange={setRiskFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedUsersCount={selectedUsersCount}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          trendFilter={trendFilter}
          onTrendFilterChange={setTrendFilter}
          filteredUsers={users}
        />
      </main>
    </div>
  );
}

// Wrapper with bulk selections
function RiskHeaderWithSelectionsWrapper() {
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score-desc");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [trendFilter, setTrendFilter] = useState("all");
  const [selectedUsersCount] = useState(5);

  return (
    <div className="bg-content-bg min-h-screen">
      <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
        <RiskHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          riskFilter={riskFilter}
          onRiskFilterChange={setRiskFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedUsersCount={selectedUsersCount}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          trendFilter={trendFilter}
          onTrendFilterChange={setTrendFilter}
          filteredUsers={users}
        />
      </main>
    </div>
  );
}

// Wrapper with active filters
function RiskHeaderWithFiltersWrapper() {
  const [searchQuery, setSearchQuery] = useState("sarah");
  const [riskFilter, setRiskFilter] = useState("critical");
  const [sortBy, setSortBy] = useState("name-asc");
  const [departmentFilter, setDepartmentFilter] = useState("Engineering");
  const [trendFilter, setTrendFilter] = useState("up");
  const [selectedUsersCount] = useState(0);

  return (
    <div className="bg-content-bg min-h-screen">
      <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
        <RiskHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          riskFilter={riskFilter}
          onRiskFilterChange={setRiskFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedUsersCount={selectedUsersCount}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          trendFilter={trendFilter}
          onTrendFilterChange={setTrendFilter}
          filteredUsers={users.filter(u => u.riskLevel === 'critical')}
        />
      </main>
    </div>
  );
}

const meta = {
  title: 'Risk Scoring/Header',
  component: RiskHeaderWrapper,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RiskHeaderWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state with no filters applied and no users selected.
 * Shows the two-level layout:
 * - Level 1: Title + 25% width search bar
 * - Level 2: Filters (left) + Export CSV button (right)
 */
export const Default: Story = {};

/**
 * Shows the header with 5 users selected for bulk operations.
 * The "Assign Training" button appears next to Export CSV when users are selected.
 */
export const WithBulkSelection: Story = {
  render: () => <RiskHeaderWithSelectionsWrapper />,
};

/**
 * Shows the header with all filters actively applied:
 * - Search: "sarah"
 * - Risk Level: Critical
 * - Sort: Name (A-Z)
 * - Department: Engineering
 * - Trend: Increasing Risk
 */
export const WithActiveFilters: Story = {
  render: () => <RiskHeaderWithFiltersWrapper />,
};
