import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ProjectFilters = ({ onFilterChange, onSortChange, onViewChange, currentView = 'grid' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [sortBy, setSortBy] = useState('modified');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'deployed', label: 'Deployed' },
    { value: 'building', label: 'Building' },
    { value: 'draft', label: 'Draft' },
    { value: 'error', label: 'Error' }
  ];

  const techOptions = [
    { value: 'all', label: 'All Technologies' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'next.js', label: 'Next.js' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'angular', label: 'Angular' }
  ];

  const sortOptions = [
    { value: 'modified', label: 'Last Modified' },
    { value: 'created', label: 'Date Created' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'status', label: 'Status' },
    { value: 'progress', label: 'Progress' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onFilterChange({ search: value, status: selectedStatus, technology: selectedTech });
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    onFilterChange({ search: searchQuery, status: value, technology: selectedTech });
  };

  const handleTechChange = (value) => {
    setSelectedTech(value);
    onFilterChange({ search: searchQuery, status: selectedStatus, technology: value });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedTech('all');
    setSortBy('modified');
    onFilterChange({ search: '', status: 'all', technology: 'all' });
    onSortChange('modified');
  };

  const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedTech !== 'all' || sortBy !== 'modified';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
          <div className="flex-1 min-w-0">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-3">
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
              placeholder="Status"
              className="w-40"
            />
            
            <Select
              options={techOptions}
              value={selectedTech}
              onChange={handleTechChange}
              placeholder="Technology"
              className="w-40"
            />
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-3">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortChange}
            placeholder="Sort by"
            className="w-36"
          />
          
          <div className="flex items-center border border-border rounded-lg p-1">
            <button
              onClick={() => onViewChange('grid')}
              className={`p-2 rounded transition-colors ${
                currentView === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`p-2 rounded transition-colors ${
                currentView === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={clearFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          <div className="flex items-center space-x-2">
            {searchQuery && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                Search: "{searchQuery}"
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                Status: {statusOptions?.find(opt => opt?.value === selectedStatus)?.label}
              </span>
            )}
            {selectedTech !== 'all' && (
              <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20">
                Tech: {techOptions?.find(opt => opt?.value === selectedTech)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;